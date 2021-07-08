package it.wikimedia.wikilovesmonuments;

import android.os.Debug;

import java.io.InputStream;
import java.lang.System;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.appcelerator.kroll.common.Log;
import org.appcelerator.kroll.util.KrollAssetHelper;
import org.appcelerator.titanium.TiApplication;

@SuppressWarnings("unchecked")
public class AssetCryptImpl implements KrollAssetHelper.AssetCrypt
{
	private static final String TAG = "AssetCryptImpl";

	private static final String BIN_EXT = ".bin";

	private static byte[] salt = {
		(byte)189, (byte)246, (byte)181, (byte)22, (byte)225, (byte)26, (byte)34, (byte)243, (byte)55, (byte)21, (byte)22, (byte)169, (byte)162, (byte)230, (byte)231, (byte)28
	};

	private static final Collection<String> assets =
		new ArrayList<String>(Arrays.asList(
			"Resources/ti.main.js",
			"Resources/alloy/CFG.js",
			"Resources/app.js",
			"Resources/alloy/backbone.js",
			"Resources/alloy/constants.js",
			"Resources/alloy/controllers/BaseController.js",
			"Resources/alloy/controllers/about/index.js",
			"Resources/alloy/controllers/about/info.js",
			"Resources/alloy/controllers/home/index.js",
			"Resources/alloy/controllers/home/search.js",
			"Resources/alloy/controllers/home/show.js",
			"Resources/alloy/controllers/index.js",
			"Resources/alloy/controllers/upload/config.js",
			"Resources/alloy/controllers/upload/index.js",
			"Resources/alloy/controllers/upload/title.js",
			"Resources/alloy/styles/about/index.js",
			"Resources/alloy/styles/about/info.js",
			"Resources/alloy/styles/home/index.js",
			"Resources/alloy/styles/home/search.js",
			"Resources/alloy/styles/home/show.js",
			"Resources/alloy/styles/index.js",
			"Resources/alloy/styles/upload/config.js",
			"Resources/alloy/styles/upload/index.js",
			"Resources/alloy/styles/upload/title.js",
			"Resources/alloy/sync/localStorage.js",
			"Resources/alloy/sync/properties.js",
			"Resources/alloy/sync/sql.js",
			"Resources/alloy/underscore.js",
			"Resources/alloy/widget.js",
			"Resources/alloy.bootstrap.js",
			"Resources/alloy.js",
			"Resources/utilsService.js",
			"Resources/ti.playservices/ti.playservices.bootstrap.js",
			"Resources/_app_props_.json",
			"Resources/ti.internal/bootstrap.json"
		));

	public AssetCryptImpl()
	{
		try {
			System.loadLibrary("ti.cloak");
		} catch (Exception e) {
			Log.e(TAG, "Could not load 'ti.cloak' library");
		}
	}

	@Override
	public InputStream openAsset(String path)
	{
		return getAssetStream(path);
	}

	@Override
	public String readAsset(String path)
	{
		byte[] bytes = getAssetBytes(path);
		if (bytes != null) {
			return new String(bytes, StandardCharsets.UTF_8);
		}
		return null;
	}

	@Override
	public Collection<String> getAssetPaths()
	{
		return assets;
	}

	private static InputStream getAssetStream(String path)
	{
		if (!assets.contains(path)) {
			return null;
		}
		if (!path.endsWith(BIN_EXT)) {
			path = path + BIN_EXT;
		}
		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(ti.cloak.Binding.getKey(salt), "AES"), new IvParameterSpec(salt));
			return new CipherInputStream(KrollAssetHelper.getAssetManager().open(path), cipher);
		} catch (Exception e) {
			Log.e(TAG, "Could not decrypt '" + path + "'");
			Log.e(TAG, e.toString());
		}
		return null;
	}

	private static byte[] getAssetBytes(String path)
	{
		try {
			InputStream in = getAssetStream(path);
			if (in != null) {
				return KrollAssetHelper.readInputStream(in).toByteArray();
			}
		} catch (Exception e) {
			Log.e(TAG, "Could not decrypt '" + path + "'");
			Log.e(TAG, e.toString());
		}
		return null;
	}
}
