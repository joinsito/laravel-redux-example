<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
<<<<<<< HEAD
use Auth;
=======
>>>>>>> cfd6cf5483203dbd042d4e23fe8b1703f314b771

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
<<<<<<< HEAD
    public static function getMyReports() {
        $reports = Report::where('user_id',Auth::user()->id)->get();
        return $reports;
    }
=======
>>>>>>> cfd6cf5483203dbd042d4e23fe8b1703f314b771
}
