<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Seeder;

final class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            ['id' => 1, 'name' => 'Office of the RD/ARD', 'acronym' => 'OFFICE OF THE RD/ARD', 'code' => 'A.1', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 2, 'name' => 'Legal Unit', 'acronym' => 'LEGAL', 'code' => 'A.2', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 3, 'name' => 'Communications Management Unit', 'acronym' => 'CMU', 'code' => 'A.3', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 4, 'name' => 'Malasakit Program Unit', 'acronym' => 'MPU', 'code' => 'A.4', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 5, 'name' => 'Special Concerns', 'acronym' => 'SPECIAL CONCERNS', 'code' => 'A.5', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 6, 'name' => 'Research Committee', 'acronym' => 'RESEARCH COMMITTEE', 'code' => 'A.6', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 7, 'name' => 'International Organization for Standardization Quality Management System', 'acronym' => 'ISO QMS', 'code' => 'A.7', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 8, 'name' => 'Gender and Development Committee', 'acronym' => 'GAD', 'code' => 'A.8', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 9, 'name' => 'Values Restoration Program', 'acronym' => 'VRP', 'code' => 'A.9', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 10, 'name' => 'Sports Committee', 'acronym' => 'SPORTS COMMITTEE', 'code' => 'A.10', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 11, 'name' => 'Performance Management Team', 'acronym' => 'PMT', 'code' => 'A.11', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 12, 'name' => 'Annual Medical and Dental Examination', 'acronym' => 'AMDE', 'code' => 'A.12', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 13, 'name' => 'Hospital and Medical Benefits Committee', 'acronym' => 'HMBC', 'code' => 'A.13', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 14, 'name' => 'Regional Finance Planning and Monitoring Committee', 'acronym' => 'RFPMC', 'code' => 'A.14', 'division_id' => 1, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],

            ['id' => 15, 'name' => 'Office of the MSD Chief', 'acronym' => 'OFFICE OF THE MSD CHIEF', 'code' => 'B.1', 'division_id' => 2, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 16, 'name' => 'Accounting Section', 'acronym' => 'ACCOUNTING', 'code' => 'B.2', 'division_id' => 2, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 17, 'name' => 'Budget Section', 'acronym' => 'BUDGET', 'code' => 'B.3', 'division_id' => 2, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 18, 'name' => 'Cashier Section', 'acronym' => 'CASHIER', 'code' => 'B.4', 'division_id' => 2, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 19, 'name' => 'Records Section', 'acronym' => 'RECORDS', 'code' => 'B.5', 'division_id' => 2, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 20, 'name' => 'Supply Section', 'acronym' => 'SUPPLY', 'code' => 'B.6', 'division_id' => 2, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 21, 'name' => 'Procurement Management Unit', 'acronym' => 'PMU', 'code' => 'B.7', 'division_id' => 2, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 22, 'name' => 'Information and Communications Technology Unit', 'acronym' => 'ICTU', 'code' => 'B.8', 'division_id' => 2, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 23, 'name' => 'Human Resource Management Unit', 'acronym' => 'HRMU', 'code' => 'B.9', 'division_id' => 2, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 24, 'name' => 'Transport & General Service Section', 'acronym' => 'TGSS', 'code' => 'B.10', 'division_id' => 2, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],

            ['id' => 25, 'name' => 'Office of the RLED Chief', 'acronym' => 'OFFICE OF THE RLED CHIEF', 'code' => 'C.1', 'division_id' => 3, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 26, 'name' => 'Other Health Facility Regulations Cluster', 'acronym' => 'OHFRC', 'code' => 'C.2', 'division_id' => 3, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 27, 'name' => 'Hospital & Special Regulations Concern Cluster', 'acronym' => 'HSRCC', 'code' => 'C.3', 'division_id' => 3, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 28, 'name' => 'Regulatory Complaints Enforcement Unit', 'acronym' => 'RCEU', 'code' => 'C.4', 'division_id' => 3, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 29, 'name' => 'Admin Operation', 'acronym' => 'ADMIN', 'code' => 'C.5', 'division_id' => 3, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],

            ['id' => 30, 'name' => 'Office of the LHSD Chief', 'acronym' => 'OFFICE OF THE LHSD CHIEF', 'code' => 'D.5', 'division_id' => 4, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 31, 'name' => 'Health Promotions Unit', 'acronym' => 'HPU', 'code' => 'D.1', 'division_id' => 4, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 32, 'name' => 'Non-Communicable Disease and Prevention Cluster', 'acronym' => 'NCDPC', 'code' => 'D.2', 'division_id' => 4, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 33, 'name' => 'Infectious Disease and Prevention Cluster', 'acronym' => 'IDPC', 'code' => 'D.3', 'division_id' => 4, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 34, 'name' => 'Family Health Cluster', 'acronym' => 'FHC', 'code' => 'D.4', 'division_id' => 4, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],

            ['id' => 35, 'name' => 'Office of the BSL SNRL Chief', 'acronym' => 'OFFICE OF THE BSL SNRL CHIEF', 'code' => 'E.1', 'division_id' => 5, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 36, 'name' => 'Bicol Regional Blood Center', 'acronym' => 'BRBC', 'code' => 'E.2', 'division_id' => 5, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 37, 'name' => 'Public Health Reference Laboratory', 'acronym' => 'PHRL', 'code' => 'E.3', 'division_id' => 5, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 38, 'name' => 'Covid Laboratory', 'acronym' => 'COVID LAB', 'code' => 'E.4', 'division_id' => 5, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],

            ['id' => 39, 'name' => 'Office of the PHPRU Chief', 'acronym' => 'OFFICE OF THE PHPRU CHIEF', 'code' => 'F.1', 'division_id' => 6, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 40, 'name' => 'Health Emergency Management Services', 'acronym' => 'HEMS', 'code' => 'F.2', 'division_id' => 6, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 41, 'name' => 'Regional Epidemiology and Surveillance Unit', 'acronym' => 'RESU', 'code' => 'F.3', 'division_id' => 6, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],

            ['id' => 42, 'name' => 'Office of the SMHDD Chief', 'acronym' => 'OFFICE OF THE SMHDD CHIEF', 'code' => 'G.1', 'division_id' => 7, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 43, 'name' => 'Planning Performance and Data Management Unit', 'acronym' => 'PPDMU', 'code' => 'G.2', 'division_id' => 7, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 44, 'name' => 'Health Facility Development Unit', 'acronym' => 'HFDU', 'code' => 'G.3', 'division_id' => 7, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 45, 'name' => 'Health System Development Unit', 'acronym' => 'HSDU', 'code' => 'G.4', 'division_id' => 7, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 46, 'name' => 'Infrastructure Unit', 'acronym' => 'HFEP', 'code' => 'G.6', 'division_id' => 7, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 47, 'name' => 'Human Resource Development Unit', 'acronym' => 'HRDU', 'code' => 'G.7', 'division_id' => 7, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],

            ['id' => 48, 'name' => 'FCMD Chief', 'acronym' => 'FCMD CHIEF', 'code' => 'H.1', 'division_id' => 8, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 49, 'name' => 'Provincial DOH Office Albay', 'acronym' => 'PDO ALBAY', 'code' => 'H.2', 'division_id' => 8, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 50, 'name' => 'Provincial DOH Office Camarines Norte', 'acronym' => 'PDO CAMARINES NORTE', 'code' => 'H.3', 'division_id' => 8, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 51, 'name' => 'Provincial DOH Office Camarines Sur', 'acronym' => 'PDO CAMARINES SUR', 'code' => 'H.4', 'division_id' => 8, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 52, 'name' => 'Provincial DOH Office Catanduanes', 'acronym' => 'PDO CATANDUANES', 'code' => 'H.5', 'division_id' => 8, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 53, 'name' => 'Provincial DOH Office Masbate', 'acronym' => 'PDO MASBATE', 'code' => 'H.6', 'division_id' => 8, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 54, 'name' => 'Provincial DOH Office Sorsogon', 'acronym' => 'PDO SORSOGON', 'code' => 'H.7', 'division_id' => 8, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],

            ['id' => 55, 'name' => 'Pharma', 'acronym' => 'PHARMA', 'code' => 'B.11', 'division_id' => 2, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 56, 'name' => 'Personnel Services', 'acronym' => 'PS', 'code' => 'I.1', 'division_id' => 9, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 57, 'name' => 'COVID-19 Benefits', 'acronym' => 'COVID-10', 'code' => 'I.2', 'division_id' => 9, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
            ['id' => 58, 'name' => 'Other Benefits', 'acronym' => 'OTHER BENEFITS', 'code' => 'I.3', 'division_id' => 9, 'created_at' => '2025-02-04 10:30:00', 'updated_at' => null],
        ];

        Section::query()->insert($sections);
    }
}
