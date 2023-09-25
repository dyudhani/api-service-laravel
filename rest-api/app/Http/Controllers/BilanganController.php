<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Bilangan;
use Illuminate\Support\Facades\Validator;


class BilanganController extends Controller
{
    public function hitungAkarKuadrat(Request $request)
    {
        // Waktu awal
        $start = microtime(true);

        $validator = Validator::make($request->all(), [
            'angka' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Input harus berupa angka positif atau nol.'], 400);
        }

        $angka = $request->input('angka');
        $hasil = $angka;

        // Batas error yang diterima
        $epsilon = 1e-6;


        // Loop sampai konvergen
        while ($hasil * $hasil - $angka > $epsilon * $epsilon) {
            $hasil = 0.5 * ($hasil + $angka / $hasil);
        }

        $hasil = number_format($hasil, 2);

        // Waktu akhir
        $end = microtime(true);

        $responseTime = $end - $start;

        // Format waktu respons dalam format "jam:menit:detik"
        $formattedResponseTime = gmdate('H:i:s', $responseTime * 100);

        // Simpan response time ke dalam database
        $calculation = new Bilangan();
        $calculation->bilangan = $angka;
        $calculation->hasil = $hasil;
        $calculation->waktu_respons = $formattedResponseTime; // Menyimpan response time dalam format "jam:menit:detik"
        $calculation->save();

        return response()->json(['hasil_akar_kuadrat' => $hasil, 'waktu_respons' => $formattedResponseTime], 200);
    }

    public function getDataBilangan()
    {
        $dataBilangan = Bilangan::all();
        return response()->json($dataBilangan);
    }

    public function calculateSqrtSql(Request $request)
    {
        //mulai timer
        $start = microtime(true);

        $request->validate([
            'angka' => 'required|numeric|min:0'
        ]);

        $angka = $request->input('angka');

        //panggil stored procedure calculateSqrt
        $hasil = DB::select('CALL calculateSqrt(?)', array($angka));

        $end = microtime(true);

        //hitung execution time
        $execution_time = gmdate('H:i:s', ($end - $start) * 1000);

        //ambil hasil perhitungan dari hasil set
        $hasil = $hasil[0]->hasil;

        return response()->json([
            'input_angka' => $angka,
            'hasil_akar_kuadrat' => $hasil,
            'waktu_respons' => $execution_time
        ], 200);
    }
}
