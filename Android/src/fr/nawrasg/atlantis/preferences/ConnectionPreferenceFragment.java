package fr.nawrasg.atlantis.preferences;

import android.content.Context;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.preference.Preference;
import android.preference.Preference.OnPreferenceClickListener;
import android.preference.PreferenceFragment;
import android.widget.Toast;

import fr.nawrasg.atlantis.App;
import fr.nawrasg.atlantis.R;
import fr.nawrasg.atlantis.other.CheckConnection;

public class ConnectionPreferenceFragment extends PreferenceFragment implements OnPreferenceClickListener {
    private Context mContext;
    private Preference mWifiPreference;
    private WifiManager mWM;
    private CheckConnection mConnection;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        addPreferencesFromResource(R.xml.pref_connection);
        mContext = getActivity();
        mWM = (WifiManager) getActivity().getSystemService(Context.WIFI_SERVICE);
        mConnection = new CheckConnection(mContext);
        mWifiPreference = findPreference("wifiHome");
        mWifiPreference.setOnPreferenceClickListener(this);
        mWifiPreference.setTitle(App.getPrefSetSize(mContext, "wifiSet") + " " + getResources().getString(R.string.fragment_preference_connection_wifi_description_registered));
    }

    @Override
    public boolean onPreferenceClick(Preference preference) {
        switch (preference.getKey()) {
            case "wifiHome":
                if (mConnection.checkConnection() == CheckConnection.TYPE_WIFI) {
                    String y = mWM.getConnectionInfo().getSSID();
                    App.addPrefSetString(mContext, "wifiSet", y);
                    mWifiPreference.setTitle(App.getPrefSetSize(mContext, "wifiSet") + " " + getResources().getString(R.string.fragment_preference_connection_wifi_description_registered));
                } else {
                    Toast.makeText(mContext, getResources().getString(R.string.fragment_preference_connection_wifi_offline), Toast.LENGTH_LONG).show();
                }
                return true;
        }
        return false;
    }

}
