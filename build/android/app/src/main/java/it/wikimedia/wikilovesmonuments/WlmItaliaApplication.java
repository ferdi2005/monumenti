/* AUTO-GENERATED FILE.  DO NOT MODIFY.
 *
 * This class was automatically generated by
 * Appcelerator. It should not be modified by hand.
 */
package it.wikimedia.wikilovesmonuments;

import org.appcelerator.kroll.runtime.v8.V8Runtime;

import org.appcelerator.kroll.KrollExternalModule;
import org.appcelerator.kroll.common.KrollSourceCodeProvider;
import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.KrollModuleInfo;
import org.appcelerator.kroll.KrollRuntime;
import org.appcelerator.kroll.util.KrollAssetCache;
import org.appcelerator.kroll.util.KrollAssetHelper;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiRootActivity;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import android.util.Log;

public final class WlmItaliaApplication extends TiApplication
{
	private static final String TAG = "WlmItaliaApplication";

	@Override
	@SuppressWarnings("unchecked")
	public void onCreate()
	{
		appInfo = new WlmItaliaAppInfo(this);

		KrollAssetHelper.setAssetCrypt(new AssetCryptImpl());

		// Load cache as soon as possible.
		KrollAssetCache.init(this);

		super.onCreate();
		postAppInfo();

		V8Runtime runtime = new V8Runtime();


		{
		
			String className = "ti.osm.TiModuleBootstrap";
		
			try {
				runtime.addExternalModule(
						"ti.osm",
						(Class<KrollExternalModule>) Class.forName(className));
			} catch (Throwable ex) {
				Log.e(TAG, "Failed to add external module: " + className);
				if ((ex instanceof RuntimeException) == false) {
					ex = new RuntimeException(ex);
				}
				throw (RuntimeException) ex;
			}
		}
		

		{
		
			String className = "ti.map.TiModuleBootstrap";
		
			try {
				runtime.addExternalModule(
						"ti.map",
						(Class<KrollExternalModule>) Class.forName(className));
			} catch (Throwable ex) {
				Log.e(TAG, "Failed to add external module: " + className);
				if ((ex instanceof RuntimeException) == false) {
					ex = new RuntimeException(ex);
				}
				throw (RuntimeException) ex;
			}
		}
		

		{
		
			String className = "hyperloop.TiModuleBootstrap";
		
			try {
				runtime.addExternalModule(
						"hyperloop",
						(Class<KrollExternalModule>) Class.forName(className));
			} catch (Throwable ex) {
				Log.e(TAG, "Failed to add external module: " + className);
				if ((ex instanceof RuntimeException) == false) {
					ex = new RuntimeException(ex);
				}
				throw (RuntimeException) ex;
			}
		}
		

		{
		
			String className = "ti.flurry.FlurryAndroidBootstrap";
		
			try {
				runtime.addExternalModule(
						"ti.flurry",
						(Class<KrollExternalModule>) Class.forName(className));
			} catch (Throwable ex) {
				Log.e(TAG, "Failed to add external module: " + className);
				if ((ex instanceof RuntimeException) == false) {
					ex = new RuntimeException(ex);
				}
				throw (RuntimeException) ex;
			}
		}
		

		{
		
			String className = "ti.playservices.TiModuleBootstrap";
		
			try {
				runtime.addExternalModule(
						"ti.playservices",
						(Class<KrollExternalModule>) Class.forName(className));
			} catch (Throwable ex) {
				Log.e(TAG, "Failed to add external module: " + className);
				if ((ex instanceof RuntimeException) == false) {
					ex = new RuntimeException(ex);
				}
				throw (RuntimeException) ex;
			}
		}
		

		{
		
			String className = "ti.identity.TiModuleBootstrap";
		
			try {
				runtime.addExternalModule(
						"ti.identity",
						(Class<KrollExternalModule>) Class.forName(className));
			} catch (Throwable ex) {
				Log.e(TAG, "Failed to add external module: " + className);
				if ((ex instanceof RuntimeException) == false) {
					ex = new RuntimeException(ex);
				}
				throw (RuntimeException) ex;
			}
		}
		

		{
		
			String className = "ti.webdialog.TiModuleBootstrap";
		
			try {
				runtime.addExternalModule(
						"ti.webdialog",
						(Class<KrollExternalModule>) Class.forName(className));
			} catch (Throwable ex) {
				Log.e(TAG, "Failed to add external module: " + className);
				if ((ex instanceof RuntimeException) == false) {
					ex = new RuntimeException(ex);
				}
				throw (RuntimeException) ex;
			}
		}
		


		KrollRuntime.init(this, runtime);

		postOnCreate();


		// Custom modules
		KrollModuleInfo moduleInfo;
	
		
		{
			String className = "ti.osm.TiOsmModule";
			String methodName = "onAppCreate";
			try {
				Class moduleClass = Class.forName(className);
				Method moduleMethod = moduleClass.getMethod(methodName, TiApplication.class);
				moduleMethod.invoke(null, this);
			} catch (Throwable ex) {
				Log.e(TAG, "Error invoking: " + className + "." + methodName + "()");
				if ((ex instanceof InvocationTargetException) && (ex.getCause() != null)) {
					ex = ex.getCause();
				}
				if ((ex instanceof RuntimeException) == false) {
					ex = new RuntimeException(ex);
				}
				throw (RuntimeException) ex;
			}
		}
		

		moduleInfo = new KrollModuleInfo(
			"ti.osm", "ti.osm", "2d5116e8-1aca-40b9-91f4-e844253c3477", "1.0.1",
			"ti.osm",
			"Michael Gangolf",
			"MIT",
			"Copyright (c) 2021 by Michael Gangolf");

		

		

		KrollModule.addCustomModuleInfo(moduleInfo);
	
		

		moduleInfo = new KrollModuleInfo(
			"map", "ti.map", "f0d8fd44-86d2-4730-b67d-bd454577aeee", "5.0.1",
			"External version of Map module using native Google Maps library",
			"Appcelerator",
			"Apache Public License v2",
			"Copyright (c) 2013-present by Axway, Inc.");

		

		

		KrollModule.addCustomModuleInfo(moduleInfo);
	
		

		moduleInfo = new KrollModuleInfo(
			"hyperloop-android", "hyperloop", "bdaca69f-b316-4ce6-9065-7a61e1dafa39", "7.0.1",
			"hyperloop-android",
			"Appcelerator",
			"Appcelerator Commercial License",
			"Copyright (c) 2017-2021 Axway, Inc.");

		

		

		KrollModule.addCustomModuleInfo(moduleInfo);
	
		
		{
			String className = "ti.flurry.FlurryAndroidModule";
			String methodName = "onAppCreate";
			try {
				Class moduleClass = Class.forName(className);
				Method moduleMethod = moduleClass.getMethod(methodName, TiApplication.class);
				moduleMethod.invoke(null, this);
			} catch (Throwable ex) {
				Log.e(TAG, "Error invoking: " + className + "." + methodName + "()");
				if ((ex instanceof InvocationTargetException) && (ex.getCause() != null)) {
					ex = ex.getCause();
				}
				if ((ex instanceof RuntimeException) == false) {
					ex = new RuntimeException(ex);
				}
				throw (RuntimeException) ex;
			}
		}
		

		moduleInfo = new KrollModuleInfo(
			"flurry_android", "ti.flurry", "cb18a7d2-baa4-4c0d-a0b1-b07b8676f2ec", "3.0.0",
			"Flurry event reporting module",
			"Ayo Adesugba",
			"Apache License, Version 2.0",
			"Copyright (c) 2010-2014 by Appcelerator, Inc.");

		

		

		KrollModule.addCustomModuleInfo(moduleInfo);
	
		

		moduleInfo = new KrollModuleInfo(
			"playservices", "ti.playservices", "32184149-411f-436b-92a8-c6ddb98a5fb6", "17.5.0",
			"Titanium Google Play Services module.",
			"",
			"Apache Public License v2",
			"Copyright (c) 2017-2020 by Axway Appcelerator");

		

		

		KrollModule.addCustomModuleInfo(moduleInfo);
	
		

		moduleInfo = new KrollModuleInfo(
			"titanium-identity", "ti.identity", "c3d987a8-8bd4-42cd-a3e4-2a75952d1ea0", "3.0.3",
			"titanium-identity",
			"Hans Knoechel",
			"Specify your license",
			"Copyright (c) 2017 by Your Company");

		

		

		KrollModule.addCustomModuleInfo(moduleInfo);
	
		

		moduleInfo = new KrollModuleInfo(
			"titanium-web-dialog", "ti.webdialog", "1f19cce1-0ad7-4e25-ab3b-0666f54a0a49", "2.0.0",
			"titanium-web-dialog",
			"Prashant Saini",
			"Apache 2.0",
			"Copyright (c) 2017 by Axway Appcelerator & Prashant Saini");

		

		

		KrollModule.addCustomModuleInfo(moduleInfo);
	

	}

	@Override
	public void verifyCustomModules(TiRootActivity rootActivity)
	{

	}
}
