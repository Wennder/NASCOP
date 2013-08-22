<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');
class National_Management extends MY_Controller {
	function __construct() {
		parent::__construct();
		/*
		 * ca->Commodity Analysis
		 * pa->Patient Analysis
		 * fa->Facility Analysis
		 * oa->Order Analysis
		 * ra->Reporting Analysis
		 */
	}

	public function ca_stock_status($year, $month, $pipeline, $type = 0) {
		/*
		 * Check if (type==0) then it is facility else national stock_status
		 */
		if ($type == 1) {

		} else {
			$results = Facility_Soh::getTotals($pipeline, $month, $year);
			$facility_results = Facility_Soh::getFacilities($pipeline, $month, $year);
			$drug_results = Facility_Soh::getDrugs($pipeline, $month, $year);
			$count = 1;
			$i = 0;
			$dyn_table = "<table border='1' id='patient_listing'  cellpadding='5' class='dataTables'>";
			$dyn_table .= "<thead><tr><th>Facility Name</th>";
			foreach ($drug_results as $drug_result) {
				$dyn_table .= "<th>" . $drug_result['drugname'] . "</th>";
			}
			$dyn_table .= "</tr></thead>";
			$dyn_table .= "<tbody><tr><td>" . $facility_results[$i]['facilityname'] . "</td>";
			foreach ($results as $result) {
				$dyn_table .= "<td>" . $result['total'] . "</td>";
				$count++;
				if ($count == sizeof($drug_results) + 1) {
					$dyn_table .= "</tr>";
					$count = 1;
					if ($i < sizeof($facility_results) - 1) {
						$i++;
						$dyn_table .= "<tr><td>" . $facility_results[$i]['facilityname'] . "</td>";

					}
				}

			}
			echo $dyn_table;
		}
	}

	public function ca_consumption($year, $month, $pipeline, $type = 0) {
		/*
		 * Check if (type==0) then it is facility else pipeline consumption
		 */
		if ($type == 1) {

		} else {
			$results = Facility_Consumption::getTotals($pipeline, $month, $year);
			$facility_results = Facility_Consumption::getFacilities($pipeline, $month, $year);
			$drug_results = Facility_Consumption::getDrugs($pipeline, $month, $year);
			$count = 1;
			$i = 0;
			$dyn_table = "<table border='1' id='patient_listing'  cellpadding='5' class='dataTables'>";
			$dyn_table .= "<thead><tr><th>Facility Name</th>";
			foreach ($drug_results as $drug_result) {
				$dyn_table .= "<th>" . $drug_result['drugname'] . "</th>";
			}
			$dyn_table .= "</tr></thead>";
			$dyn_table .= "<tbody><tr><td>" . $facility_results[$i]['facilityname'] . "</td>";
			foreach ($results as $result) {
				$dyn_table .= "<td>" . $result['total'] . "</td>";
				$count++;
				if ($count == sizeof($drug_results) + 1) {
					$dyn_table .= "</tr>";
					$count = 1;
					if ($i < sizeof($facility_results) - 1) {
						$i++;
						$dyn_table .= "<tr><td>" . $facility_results[$i]['facilityname'] . "</td>";

					}
				}

			}
			$dyn_table .= "</tbody></table>";
			//echo $dyn_table;
		}
$dyn_table .= "</tbody></table>";
		$data['label'] = 'Facility';
		$data['table'] = 'facilities';
		$data['actual_page'] = 'View Facilities';
		$data['dyn_table'] = $dyn_table;
		$this -> base_params($data);
	}

	public function pa_patients_by_regimen() {

	}

	public function pa_patients_by_artsite() {
		$dyn_table .= "</tbody></table>";
		$data['label'] = 'Facility';
		$data['table'] = 'facilities';
		$data['actual_page'] = 'View Facilities';
		$data['dyn_table'] = $dyn_table;
		$this -> base_params($data);
	}

	public function pa_patients_scaleup() {

	}

	public function fa_ordering_sites_list() {

	}

	public function fa_ordering_sites_summary() {

	}

	public function fa_service_points_list() {

	}

	public function fa_service_points_summary() {

	}

	public function oa_orders_by_commodity() {

	}

	public function oa_orders_reporting_rate() {

	}

	public function oa_fmaps_statistics() {

	}

	public function oa_pipeline_order_deliveryrates() {

	}

	public function ra_reporting_rates_per_facilitytype() {

	}

	public function ra_reporting_rates_per_facility() {

	}

	public function ra_non_reporting_facility_rates() {

	}

	public function base_params($data) {
		$data['content_view'] = "admin/add_param_a";
		$data['title'] = "webADT | System Admin";
		$data['banner_text'] = "System Admin";
		$this -> load -> view('admin/admin_template', $data);
	}

}
?>