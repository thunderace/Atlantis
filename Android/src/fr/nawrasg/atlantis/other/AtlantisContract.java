package fr.nawrasg.atlantis.other;

import android.content.ContentResolver;
import android.net.Uri;
import android.provider.BaseColumns;

/**
 * Created by Nawras on 23/06/2016.
 */

public final class AtlantisContract {

    public static final String AUTHORITY = "fr.nawrasg.atlantis";
    public static final Uri CONTENT_URI = Uri.parse("content://" + AUTHORITY);
    public static final String SELECTION_ID_BASED = BaseColumns._ID
             + " = ? ";

    public static final class Ean implements BaseColumns{
        public static final Uri CONTENT_URI = Uri.withAppendedPath(AtlantisContract.CONTENT_URI, "ean");
        public static final String CONTENT_TYPE = ContentResolver.CURSOR_DIR_BASE_TYPE + "/vnd.fr.nawrasg.atlantis.ean";
        public static final String CONTENT_TYPE_ITEM = ContentResolver.CURSOR_ITEM_BASE_TYPE + "/vnd.fr.nawrasg.atlantis.ean";
        public static final String[] PROJECTION_ALL = {"ean", "nom"};
    }
}