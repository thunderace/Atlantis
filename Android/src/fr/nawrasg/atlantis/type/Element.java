package fr.nawrasg.atlantis.type;

import java.util.HashMap;

import org.json.JSONObject;

public class Element {
	private String mName;
	private int mQuantity, mID;
	private boolean mDone;
	
	public Element(JSONObject x){
		try{
			mID = x.getInt("id");
			mName = x.getString("name");
			mQuantity = x.getInt("quantity");
			mDone = false;
		}catch(Exception e){
			
		}
	}

	public Element(String name, String quantity){
		try{
			mName = name;
			mQuantity = Integer.parseInt(quantity);
		}catch(Exception e){

		}
	}
	
	public HashMap<String, String> getMap(){
		HashMap<String, String> nMap = new HashMap<String, String>();
		nMap.put("titre", mName);
		nMap.put("quantite", mQuantity + "");
		return nMap;
	}
	
	public int getQuantity(){
		return mQuantity;
	}
	
	public String getName(){
		return mName;
	}
	
	public int getID(){
		return mID;
	}

	public void increment(){
		mQuantity++;
	}

	public void decrement(){
		mQuantity--;
	}

	public boolean isDone(){
		return mDone;
	}

	public void done(boolean value){
		mDone = value;
	}
}
