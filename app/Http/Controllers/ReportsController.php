<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Report;
use App\Test;
use PDF;

class ReportsController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Get report lists
     *
     * @return string
     *
     */
    public function getlist() {
        $reports = Report::all();
        return response()
            ->json(['reports' => $reports]);

    }

    /**
     * Get Report details and return json.
     *
     * @return string
     */
    public function getdetails($id) {
        $report = Report::getReportsWithTests($id);
        return response()
            ->json(['report' => $report]);

    }

    /**
     * Add Report for client
     *
     * @return string
     */
    public function addreport(Request $data) {
        $report = new Report;
        $report->title=$data->title;
        $report->user_id=$data->user;
        $report->save();
        if(isset($data->tests)) {
            foreach ($data->tests as $test) {
                $tests[]=new Test(['name' => $test['name'],'result' => $test['result']]);
            }
            $report->tests()->saveMany($tests);
        }

    }

    /**
     * Add Report for client
     *
     * @return string
     */
    public function editreport($id, Request $data) {
        $report = Report::find($id);
        $report->title = $data->title;
        $report->user_id = $data->user_id;
        // Update report data
        $report->save();
        if(isset($data->tests)) {
            // Update associated Tests
            foreach ($data->tests as $testTmp) {
                if (isset($testTmp['id'])) {
                    $test = Test::find($testTmp['id']);
                }else {
                    $test = new Test;
                    $test->report_id = $id;
                }
                $test->name = isset($testTmp['name'])?$testTmp['name']:'';
                $test->result = isset($testTmp['result'])?$testTmp['result']:'';
                $test->save();
            }
        }
        $report = Report::getReportsWithTests($id);
        return response()->json(['report' => $report]);
    }

    public function pdfexport($reportId) {
        $report = Report::getReportsWithTests($reportId);
        $pdf = PDF::loadView('reportpdf',['report' => $report]);
        return $pdf->download('invoice.pdf');

    }
}
