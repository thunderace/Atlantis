<?php
require_once __DIR__. '/Settings.php';

class Log{
	var $filename = 'log.at';
	var $level;
	
	const NONE = 0;
	const DEBUG = 1;
	const INFO = 2;
	const WARN = 3;
	const ERROR = 4;

	function __construct(){
		$this->level = (new Settings())->getSettings('Log', 'level');
	}
	
	function log($level, $owner, $data){
		if($level >= $this->level){
			$date = date('Y-m-d H:i:s');
			$output = $date . "\t". $owner . "\t" . $level . "\t" . $data . "\n";
			file_put_contents(dirname(__FILE__) . "/" . $this->filename, $output, FILE_USE_INCLUDE_PATH | FILE_APPEND | LOCK_EX);
		}		
	}
	
	function updateLevel($level){
		$this->level = $level;
		(new Settings())->setSettings('Log', 'level', $level);
	}
	
	function clear(){
		file_put_contents($this->filename, '', FILE_USE_INCLUDE_PATH | LOCK_EX);
	}
	
	function read(){
		return file_get_contents($this->filename, true);
	}
}