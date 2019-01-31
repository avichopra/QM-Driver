package com.quick_medic_driver;
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;


import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
 import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.airbnb.android.react.maps.MapsPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new LocationServicesDialogBoxPackage(),
            new ImageResizerPackage(),
            new MapsPackage(),
            new RNGooglePlacesPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new ImagePickerPackage(),
            new RNGestureHandlerPackage()
                        
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
