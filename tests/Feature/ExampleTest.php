<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $response = $this->get('/');

<<<<<<< HEAD
        $response->assertStatus(302);
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testLoginTest()
    {
        $response = $this->get('/login');

=======
>>>>>>> cfd6cf5483203dbd042d4e23fe8b1703f314b771
        $response->assertStatus(200);
    }
}
