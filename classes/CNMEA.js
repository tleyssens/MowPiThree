
let sm_a = 6378137.0
let sm_b = 6356752.314
let UTMScaleFactor = 0.9996
let isFirstFixPositionSet = true

function ArcLengthOfMeridian(phi)
{
		const n = (sm_a - sm_b) / (sm_a + sm_b);
		let alpha = ((sm_a + sm_b) / 2.0) * (1.0 + (Math.pow(n, 2.0) / 4.0) + (Math.pow(n, 4.0) / 64.0));
		let beta = (-3.0 * n / 2.0) + (9.0 * Math.pow(n, 3.0) * 0.0625) + (-3.0 * Math.pow(n, 5.0) / 32.0);
		let gamma = (15.0 * Math.pow(n, 2.0) * 0.0625) + (-15.0 * Math.pow(n, 4.0) / 32.0);
		let delta = (-35.0 * Math.pow(n, 3.0) / 48.0) + (105.0 * Math.pow(n, 5.0) / 256.0);
		let epsilon = (315.0 * Math.pow(n, 4.0) / 512.0);
		return alpha * (phi + (beta * Math.sin(2.0 * phi))
						+ (gamma * Math.sin(4.0 * phi))
						+ (delta * Math.sin(6.0 * phi))
						+ (epsilon * Math.sin(8.0 * phi)));
}

function DecDeg2UTM( lat, lon) {
	let zone
	if (isFirstFixPositionSet) {
		zone = Math.floor((lon + 180.0) * 0.16666666666666666666666666666667) + 1
	}
	let xy = [] = MapLatLonToXY(lat * 0.01745329251994329576923690766743,	lon * 0.01745329251994329576923690766743,	(-183.0 + (zone * 6.0)) * 0.01745329251994329576923690766743)

	xy[0] = (xy[0] * UTMScaleFactor) + 500000.0;
	xy[1] *= UTMScaleFactor;
	if (xy[1] < 0.0)
		xy[1] += 10000000.0;
	return xy;
}
function MapLatLonToXY( phi, lambda, lambda0)
{
		let xy = [];
		let ep2 = (Math.pow(sm_a, 2.0) - Math.pow(sm_b, 2.0)) / Math.pow(sm_b, 2.0);
		let nu2 = ep2 * Math.pow(Math.cos(phi), 2.0);
		let n = Math.pow(sm_a, 2.0) / (sm_b * Math.sqrt(1 + nu2));
		let t = Math.tan(phi);
		let t2 = t * t;
		let l = lambda - lambda0;
		let l3Coef = 1.0 - t2 + nu2;
		let l4Coef = 5.0 - t2 + (9 * nu2) + (4.0 * (nu2 * nu2));
		let l5Coef = 5.0 - (18.0 * t2) + (t2 * t2) + (14.0 * nu2) - (58.0 * t2 * nu2);
		let l6Coef = 61.0 - (58.0 * t2) + (t2 * t2) + (270.0 * nu2) - (330.0 * t2 * nu2);
		let l7Coef = 61.0 - (479.0 * t2) + (179.0 * (t2 * t2)) - (t2 * t2 * t2);
		let l8Coef = 1385.0 - (3111.0 * t2) + (543.0 * (t2 * t2)) - (t2 * t2 * t2);

		/* Calculate easting (x) */
		xy[0] = (n * Math.cos(phi) * l)
				+ (n / 6.0 * Math.pow(Math.cos(phi), 3.0) * l3Coef * Math.pow(l, 3.0))
				+ (n / 120.0 * Math.pow(Math.cos(phi), 5.0) * l5Coef * Math.pow(l, 5.0))
				+ (n / 5040.0 * Math.pow(Math.cos(phi), 7.0) * l7Coef * Math.pow(l, 7.0));

		/* Calculate northing (y) */
		xy[1] = ArcLengthOfMeridian(phi)
				+ (t / 2.0 * n * Math.pow(Math.cos(phi), 2.0) * Math.pow(l, 2.0))
				+ (t / 24.0 * n * Math.pow(Math.cos(phi), 4.0) * l4Coef * Math.pow(l, 4.0))
				+ (t / 720.0 * n * Math.pow(Math.cos(phi), 6.0) * l6Coef * Math.pow(l, 6.0))
				+ (t / 40320.0 * n * Math.pow(Math.cos(phi), 8.0) * l8Coef * Math.pow(l, 8.0));

		return xy;
}

console.log( 'uitkomst =', DecDeg2UTM(50.996328535, 5.3881682516666665))