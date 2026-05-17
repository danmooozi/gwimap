declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: { center: any; level: number }) => any;
        LatLng: new (lat: number, lng: number) => any;
        Marker: new (options: { position: any; title?: string }) => any;
        LatLngBounds: new () => { extend: (latLng: any) => void };
        MarkerClusterer: new (options: {
          map: any;
          averageCenter?: boolean;
          minLevel?: number;
        }) => { addMarkers: (markers: any[]) => void };
      };
    };
  }
}

export {};
