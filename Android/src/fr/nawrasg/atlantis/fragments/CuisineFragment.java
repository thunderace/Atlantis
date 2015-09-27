package fr.nawrasg.atlantis.fragments;

import android.app.ListFragment;
import android.content.Context;
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.ContextMenu.ContextMenuInfo;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView.AdapterContextMenuInfo;
import android.widget.SearchView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import fr.nawrasg.atlantis.App;
import fr.nawrasg.atlantis.MainFragmentActivity;
import fr.nawrasg.atlantis.R;
import fr.nawrasg.atlantis.adapters.CuisineAdapter;
import fr.nawrasg.atlantis.async.DataDELETE;
import fr.nawrasg.atlantis.async.DataGET;
import fr.nawrasg.atlantis.async.DataPUT;
import fr.nawrasg.atlantis.type.Produit;

public class CuisineFragment extends ListFragment {
	private Context nContext;
	private ArrayList<Produit> nList;
	private CuisineAdapter mAdapter;

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
		nContext = super.getActivity();
		View nView = inflater.inflate(R.layout.fragment_cuisine, container, false);
		getActivity().getActionBar().setIcon(R.drawable.ng_kittle);
		setHasOptionsMenu(true);
		return nView;
	}
		
	@Override
	public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
		super.onCreateOptionsMenu(menu, inflater);
		inflater.inflate(R.menu.fragment_cuisine, menu);
		SearchView nSV = (SearchView) menu.findItem(R.id.itemSearch).getActionView();
		SearchView.OnQueryTextListener queryTextListener = new SearchView.OnQueryTextListener() {
			public boolean onQueryTextChange(String newText) {
				if (mAdapter != null)
					mAdapter.getFilter().filter(newText);
				return true;
			}

			public boolean onQueryTextSubmit(String query) {
				return true;
			}
		};
		nSV.setOnQueryTextListener(queryTextListener);
	}

	@Override
	public void onPrepareOptionsMenu(Menu menu) {
		super.onPrepareOptionsMenu(menu);
		MenuItem nSeeAllItem = menu.findItem(R.id.itemCuisineAll);
		if(mAdapter != null && mAdapter.isShowAll()){
			nSeeAllItem.setChecked(true);
		}else{
			nSeeAllItem.setChecked(false);
		}
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
			case R.id.itemCuisineAdd:
				((MainFragmentActivity) getActivity()).loadFragment(new CuisineAddFragment(), true);
				break;
			case R.id.itemCuisineAll:
				mAdapter.toggleShow();
				break;
		}
		return super.onOptionsItemSelected(item);
	}

	@Override
	public void onActivityCreated(Bundle savedInstanceState) {
		super.onActivityCreated(savedInstanceState);
		registerForContextMenu(getListView());
	}

	@Override
	public void onResume() {
		super.onResume();
		getItems();
	}

	@Override
	public void onCreateContextMenu(ContextMenu menu, View v, ContextMenuInfo menuInfo) {
		super.onCreateContextMenu(menu, v, menuInfo);
		MenuInflater nMI = getActivity().getMenuInflater();
		nMI.inflate(R.menu.context_cuisine, menu);
	}

	@Override
	public boolean onContextItemSelected(MenuItem item) {
		AdapterContextMenuInfo info = (AdapterContextMenuInfo) item.getMenuInfo();
		int position = info.position;
		Produit nProduit = mAdapter.getItem(position);
		switch (item.getItemId()) {
			case R.id.itemCuisineOpen:
				new CuisinePUT(nContext, nProduit, ',').execute(App.CUISINE, "open=" + nProduit.getID());
				return true;
			case R.id.itemCuisinePlus:
				new CuisinePUT(nContext, nProduit, '+').execute(App.CUISINE, "id=" + nProduit.getID() + "&quantite=" + (nProduit.getQuantite() + 1));
				return true;
			case R.id.itemCuisineMinus:
				new CuisinePUT(nContext, nProduit, '-').execute(App.CUISINE, "id=" + nProduit.getID() + "&quantite=" + (nProduit.getQuantite() - 1));
				return true;
			case R.id.itemCuisineDel:
				new CuisineDELETE(nContext, nProduit).execute(App.CUISINE, "id=" + nProduit.getID());
				return true;
			case R.id.itemCuisineAvoid:
				new CuisinePUT(nContext, nProduit, '.').execute(App.CUISINE, "ignore=" + nProduit.getID());
				return true;
		}
		return super.onContextItemSelected(item);
	}

	public void getItems() {
		new CuisineGET(nContext).execute(App.CUISINE);
	}

	private class CuisineGET extends DataGET{

		public CuisineGET(Context context) {
			super(context);
		}

		@Override
		protected void onPostExecute(String result) {
			if(getResultCode() == 202){
				nList = new ArrayList<>();
				try {
					JSONArray nArr = new JSONArray(result);
					for(int i = 0; i < nArr.length(); i++){
						JSONObject nJson = nArr.getJSONObject(i);
						Produit nProduit = new Produit(nJson);
						nList.add(nProduit);
					}
					mAdapter = new CuisineAdapter(nContext, nList);
					setListAdapter(mAdapter);
				}catch(JSONException e){
					Toast.makeText(nContext, e.toString(), Toast.LENGTH_LONG).show();
				}
			}
			super.onPostExecute(result);
		}
	}

	private class CuisinePUT extends DataPUT{
		private Produit mProduit;
		private char mMode;

		public CuisinePUT(Context context, Produit produit, char mode){
			super(context);
			mProduit = produit;
			mMode = mode;
		}

		@Override
		protected void onPostExecute(String result) {
			if(getResultCode() == 202){
				switch(mMode){
					case '+':
						mProduit.increment();
						mAdapter.notifyDataSetChanged();
						break;
					case '-':
						mProduit.decrement();
						mAdapter.notifyDataSetChanged();
						break;
					case '.':
						mProduit.ignore();
						mAdapter.notifyDataSetChanged();
						break;
					case ',':
						mProduit.open();
						mAdapter.notifyDataSetChanged();
						break;
				}
			}
			super.onPostExecute(result);
		}
	}

	private class CuisineDELETE extends DataDELETE{
		private Produit mProduit;

		public CuisineDELETE(Context context, Produit produit){
			super(context);
			mProduit = produit;
		}

		@Override
		protected void onPostExecute(String result) {
			if(getResultCode() == 202){
				mAdapter.remove(mProduit);
			}
			super.onPostExecute(result);
		}
	}
}