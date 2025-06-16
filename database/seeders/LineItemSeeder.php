<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\LineItem;
use Illuminate\Database\Seeder;

class LineItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $line_items = [
            ['id' => 1, 'name' => 'Operations of Regional Offices', 'acronym' => 'GAS-ORO', 'code' => '200000100002000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 2, 'name' => 'Health Facilities Enhancement Program', 'acronym' => 'HFEP', 'code' => '310201100002000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 3, 'name' => 'Local Health Systems Development and Assistance', 'acronym' => 'LHSDA', 'code' => '310201100003000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 4, 'name' => 'General Management and Supervision', 'acronym' => 'GMS', 'code' => '100000100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 5, 'name' => 'Administration of Personnel Benefits', 'acronym' => 'APB', 'code' => '100000100002000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 6, 'name' => 'Health Information Technology', 'acronym' => 'HIT', 'code' => '200000100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 7, 'name' => 'Procurement and Supply Chain Management Service', 'acronym' => 'PSCMS', 'code' => '200000100003000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 8, 'name' => 'Health Sector Policy and Plan Development', 'acronym' => 'HSPPD', 'code' => '310100100002000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 9, 'name' => 'Health Sector Research Development', 'acronym' => 'HSRD', 'code' => '310100100003000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 10, 'name' => 'Health Facility Policy and Plan Development', 'acronym' => 'HFPPD', 'code' => '310201100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 11, 'name' => 'Pharmaceutical Management', 'acronym' => 'PHARMA', 'code' => '310201100004000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 12, 'name' => 'National Health Workforce Support System', 'acronym' => 'NHWSS', 'code' => '310202100003000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 13, 'name' => 'Human Resource for Health Deployment', 'acronym' => 'HRHD', 'code' => '000000000000000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 14, 'name' => 'Human Resources for Health and Institutional Capacity Management', 'acronym' => 'HRHICM', 'code' => '310202100002000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 15, 'name' => 'Health Promotion', 'acronym' => 'HP', 'code' => '310203100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 16, 'name' => 'Compensation and other Benefits for COVID-19 Workers in Health Facilities', 'acronym' => 'COVID-19 COMPENSATION', 'code' => '310300200003000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 17, 'name' => 'Covid-19 Human Resources for Health Emergency Hiring', 'acronym' => 'COVID-19 HRH EH', 'code' => '000000000000000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 18, 'name' => 'Environmental and Occupational Health', 'acronym' => 'EOH', 'code' => '310302100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 19, 'name' => 'Family Health, Immunization, Nutrition and Responsible Parenting', 'acronym' => 'FHINRP', 'code' => '310304100002000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 20, 'name' => 'Prevention and Control of Communicable Diseases', 'acronym' => 'PCCD', 'code' => '310308100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 21, 'name' => 'Prevention and Control of Non-Communicable Diseases', 'acronym' => 'PCNCD', 'code' => '310309100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 22, 'name' => 'Epidemiology and Surveillance', 'acronym' => 'EPID&SURV', 'code' => '310400100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 23, 'name' => 'Health Emergency Preparedness and Response', 'acronym' => 'HEPR', 'code' => '310500100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 24, 'name' => 'Quick Response Fund', 'acronym' => 'QRF', 'code' => '310500100002000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 25, 'name' => 'Operations of Blood Centers and National Voluntary Blood Services Program', 'acronym' => 'OBC&NVBSP', 'code' => '320101100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 26, 'name' => 'Operations of National Reference Laboratories', 'acronym' => 'ONRL', 'code' => '320101100005000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 27, 'name' => 'Operation of Dangerous Drug Abuse Treatment and Rehabilitation Centers', 'acronym' => 'ODDATRC', 'code' => '320102100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 28, 'name' => 'Assistance to Indigent Patients', 'acronym' => 'AIP', 'code' => '340100100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 29, 'name' => 'Pension and Graduity Fund', 'acronym' => 'PGF', 'code' => '1101407', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 30, 'name' => 'Contingent Fund', 'acronym' => 'CF', 'code' => '1101402', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 31, 'name' => 'Public Health Management', 'acronym' => 'PHM', 'code' => '310301100001000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 32, 'name' => 'Regulation of Regional Health Facilities and Services', 'acronym' => 'RRHFS', 'code' => '330101100002000', 'created_at' => '2025-04-25 17:00:00', 'updated_at' => null],
            ['id' => 33, 'name' => 'Public Health Emergency Benefits and Allowances for Health Care anad Non-Health Care Workers', 'acronym' => 'PHEB', 'code' => '310300200003000', 'created_at' => '2024-01-31 13:03:22', 'updated_at' => '2024-01-31 13:03:22'],
            ['id' => 34, 'name' => 'World Bank Philippine Multi-Sectoral Nutrition Project', 'acronym' => 'BANK', 'code' => '000', 'created_at' => '2024-01-31 13:04:09', 'updated_at' => '2024-01-31 13:04:09'],
            ['id' => 35, 'name' => 'Medical Assistance to Indigent and Financially - Incapacitated Patients (MAIP)', 'acronym' => 'MAIP', 'code' => '340100100003000', 'created_at' => '2024-01-31 13:04:45', 'updated_at' => '2024-01-31 13:04:45'],
            ['id' => 36, 'name' => 'Hiring of Immunization Vaccinators', 'acronym' => 'VACCINATOR', 'code' => '340100200003000', 'created_at' => '2024-01-31 13:05:04', 'updated_at' => '2024-01-31 13:05:04'],
            ['id' => 37, 'name' => 'Public Health Emergency Benefits and Allowances for Health Care and Non - Health Care Workers', 'acronym' => 'COMPENSATION', 'code' => '310300200003000', 'created_at' => '2024-01-31 13:05:37', 'updated_at' => '2024-01-31 13:05:37'],
        ];

        LineItem::insert($line_items);
    }
}
