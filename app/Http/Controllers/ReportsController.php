<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Report;
use App\Test;
use PDF;
use Auth;
use PHPMailer\PHPMailer\PHPMailer;

class ReportsController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Get report lists
     *
     * @return string
     *
     */
    public function getlist()
    {
        if (Auth::user()->admin == 1) {
            $reports = Report::all();
        }else {
            $reports = Report::getMyReports();
        }
        $reports['admin'] = Auth::user()->admin;
        return response()->json(['reports' => $reports]);
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
            // Save related tests for report
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
        // Return item to client to change state.
        $report = Report::getReportsWithTests($id);
        return response()->json(['report' => $report]);
    }
    /**
     * Delete report
     *
     * @return string
     */
    public function deletereport($id)
    {
        $report = Report::find($id);
        $report->delete();
        // Return list back to client to change state.
        $reports = Report::all();
        return response()->json(['reports' => $reports]);
    }

    /**
     * Add Report for client
     *
     * @return string
     */
    public function pdfexport($reportId) {
        $report = Report::getReportsWithTests($reportId);
        $pdf = PDF::loadView('reportpdf',['report' => $report]);
        return $pdf->download('invoice.pdf');

    }

    /**
     * Sends report pdf using email.
     *
     * @return string
     */
    public function sendemail($reportId) {
        $report = Report::getReportsWithTests($reportId);
        $name='../storage/app/'.rand().'.pdf';
        PDF::loadView('reportpdf',['report' => $report])->save($name);
        $mail = new PHPMailer(true); // notice the \  you have to use root namespace here
        try {
            $mail->isSMTP(); // tell to use smtp
            $mail->CharSet = "utf-8"; // set charset to utf8
            $mail->SMTPAuth = true;  // use smpt auth
            $mail->SMTPSecure = "tls"; // or ssl
            $mail->Host = env("MAIL_HOST");
            $mail->Port = env("MAIL_PORT"); // most likely something different for you. This is the mailtrap.io port i use for testing.
            $mail->Username = env("MAIL_USERNAME");
            $mail->Password = env("MAIL_PASSWORD");
            $mail->setFrom(env("MAIL_FROM"), env("MAIL_NAME"));
            $mail->Subject = "Report PDF";
            $mail->MsgHTML("Find attached the report PDF");
            $mail->addAddress(Auth::user()->email, Auth::user()->name);
            $mail->AddAttachment($name, 'report.pdf');
            $mail->send();
            echo "Mail sent";
        } catch (phpmailerException $e) {
            dd($e);
        } catch (Exception $e) {
            dd($e);
        }
    }
}
