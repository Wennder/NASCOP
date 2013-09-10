<?php
class Cdrr_Item extends Doctrine_Record {

	public function setTableDefinition() {
		$this -> hasColumn('Balance', 'varchar', 10);
		$this -> hasColumn('Received', 'varchar', 10);
		$this -> hasColumn('Dispensed_Units', 'varchar', 10);
		$this -> hasColumn('Dispensed_Packs', 'varchar', 10);
		$this -> hasColumn('Losses', 'varchar', 10);
		$this -> hasColumn('Adjustments', 'varchar', 10);
		$this -> hasColumn('Count', 'varchar', 10);
		$this -> hasColumn('Resupply', 'varchar', 10);
		$this -> hasColumn('Newresupply', 'varchar', 10);
		$this -> hasColumn('Aggr_Consumed', 'varchar', 10);
		$this -> hasColumn('Aggr_On_Hand', 'varchar', 10);
		$this -> hasColumn('Publish', 'varchar', 10);
		//The cdrr id is a foreign key from the facility order table
		$this -> hasColumn('Cdrr_Id', 'varchar', '150');
		$this -> hasColumn('Drug_Id', 'varchar', 10);
		$this -> hasColumn('Unique_Id', 'varchar', '150');
	}//end setTableDefinition

	public function setUp() {
		$this -> setTableName('cdrr_item');
		$this -> hasOne('Drugcode as Drugcode_Object', array('local' => 'Drug_Id', 'foreign' => 'id'));
	}//end setUp

	public static function getOrderItems($order) {
		$query = Doctrine_Query::create() -> select("*") -> from("Cdrr_Item") -> where("Cdrr_Id = '$order'");
		$items = $query -> execute();
		return $items;
	}

	public static function getItem($item) {
		$query = Doctrine_Query::create() -> select("*") -> from("Cdrr_Item") -> where("id = '$item'");
		$items = $query -> execute();
		return $items[0];
	}

	public function getTopCommodities($limit, $order_list) {
		$query = Doctrine_Query::create() -> select("Drug_Id,Resupply") -> from("Cdrr_Item") -> where("Cdrr_Id IN($order_list)") -> orderby("Resupply desc") -> limit("$limit");
		$items = $query -> execute();
		return $items;
	}
	
	public function getAllCommodities($order_list) {
		$query = Doctrine_Query::create() -> select("Drug_Id,Resupply") -> from("Cdrr_Item") -> where("Cdrr_Id IN($order_list)")->groupBy("Drug_Id") -> orderby("Drug_Id desc");
		$items = $query -> execute(array(), Doctrine::HYDRATE_ARRAY);
		return $items;
	}

}//end class
?>