<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Report extends Model
{
    //
    public function tests()
    {
        return $this->hasMany('App\Test');
    }

    public static function getReportsWithTests($reportId) {
        $report = Report::where('id',$reportId)->with('tests')->first();
        return $report;
    }
    public static function getMyReports() {
        $reports = Report::where('user_id',Auth::user()->id)->get();
        return $reports;
    }
}
