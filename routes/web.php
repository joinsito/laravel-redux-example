<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Site routes

Route::get('/', function () {
    return view('welcome');
})->middleware('auth');
Route::get('/report/{id}', function () {
    return view('welcome');
})->middleware('auth');
Route::get('/reports', function () {
    return view('welcome');
})->middleware('auth');
Route::get('/newreport', function () {
    return view('welcome');
})->middleware('auth');
Route::get('/patients', function () {
    return view('welcome');
})->middleware('auth');
Route::get('/newpatient', function () {
    return view('welcome');
})->middleware('auth');
Route::get('/patientedit/{patientId}', function () {
    return view('welcome');
})->middleware('auth');
Route::get('/reportedit/{reportId}', function () {
    return view('welcome');
})->middleware('auth');
Route::get('/pdfexport/{pdfId}', 'ReportsController@pdfexport')->middleware('auth');
<<<<<<< HEAD
Route::get('/sendemail/{reportId}', 'ReportsController@sendemail')->middleware('auth');

// API for reports
Route::get('/api/reports', 'ReportsController@getlist')->middleware('auth');
Route::get('/api/report/{reportId}', 'ReportsController@getdetails')->middleware('auth');
Route::post('/api/newreport', 'ReportsController@addreport')->middleware('admin');
Route::put('/api/editreport/{reportId}', 'ReportsController@editreport')->middleware('admin');
Route::delete('/api/deletereport/{reportId}', 'ReportsController@deletereport')->middleware('admin');


// API for Patients
Route::get('/api/patients', 'PatientsController@getlist')->middleware('admin');
Route::get('/api/patients/{patientId}', 'PatientsController@getpatient')->middleware('admin');
Route::post('/api/newpatient', 'PatientsController@addpatient')->middleware('admin');
Route::put('/api/editpatient/{patientId}', 'PatientsController@editpatient')->middleware('admin');
Route::delete('/api/deletepatient/{patientId}', 'PatientsController@deletepatient')->middleware('admin');

=======
// API for reports
Route::get('/api/reports', 'ReportsController@getlist')->middleware('auth');
Route::get('/api/report/{reportId}', 'ReportsController@getdetails')->middleware('auth');
Route::post('/api/newreport', 'ReportsController@addreport')->middleware('auth');
Route::put('/api/editreport/{reportId}', 'ReportsController@editreport')->middleware('auth');

// API for Patients
Route::get('/api/patients', 'PatientsController@getlist')->middleware('auth');
Route::get('/api/patients/{patientId}', 'PatientsController@getpatient')->middleware('auth');
Route::post('/api/newpatient', 'PatientsController@addpatient')->middleware('auth');
Route::put('/api/editpatient/{patientId}', 'PatientsController@editpatient')->middleware('auth');
>>>>>>> cfd6cf5483203dbd042d4e23fe8b1703f314b771



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
