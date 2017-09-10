<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Http\Controllers\ReportsController;

class ApiTest extends TestCase
{
    /**
     * Test Hall listing.
     *
     * @return void
     */
    public function testgetReports()
    {
        $response = $this->get('/api/reports');

        $response->assertStatus(302);
    }

    /**
     * Test Hall details get.
     * @return void
     *
     */

    public function testgetPatients()
    {
        $response = $this->get('/api/patients');

        $response->assertStatus(302);
    }
}
