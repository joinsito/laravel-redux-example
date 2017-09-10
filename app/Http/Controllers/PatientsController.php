<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class PatientsController extends Controller
{
    //
    /**
     * Get Report details and return json.
     *
     * @return string
     */
    public function getlist() {
        $patients = User::getPatients();
        return response()
            ->json(['patients' => $patients]);
    }
    /**
     * Get Report details and return json.
     *
     * @return string
     */
    public function getpatient($patientId) {
        $patient = User::find($patientId);
        return response()
            ->json(['patient' => $patient]);
    }

    /**
     * Add a patient.
     *
     * @return string
     */
    public function addpatient(Request $data)
    {
        $data->validate([
            'name' => 'required|unique:users',
            'username' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);
        return User::create([
            'name' => $data->name,
            'username' => $data->username,
            'email' => $data->email,
            'password' => bcrypt($data->password),
        ]);
    }

    /**
     * Edit a patient.
     *
     * @return string
     */
    public function editpatient($id,Request $data)
    {
        $user = User::find($id);
        $user->name = $data->name;
        $user->username = $data->username;
        $user->email = $data->email;
        $user->password = bcrypt($data->password);
        $user->save();
    }

    /**
     * Delete Patient
     *
     * @return string
     */
    public function deletereport($id)
    {
        $patient = User::find($id);
        $patient->delete();
        // Return list back to client to change state.
        $patients = User::getPatients();
        return response()->json(['patients' => $patients]);
    }
}
