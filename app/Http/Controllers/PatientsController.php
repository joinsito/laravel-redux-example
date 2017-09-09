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
        return User::create([
            'name' => $data->username,
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
        $user->email = $data->email;
        $user->password = bcrypt($data->password);
        $user->save();
    }
}
