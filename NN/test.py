import sys
import numpy as np
import cv2
from sklearn import datasets
from sklearn import svm
from sklearn.externals import joblib

PATH = "mlp_model.pkl"


def neural_network(img):
    # setting + normalizing image
	img = cv2.resize(img, (28, 28))
	
	minValueInImage = np.min(img)
	maxValueInImage = np.max(img)
	img = np.floor(np.divide((img - minValueInImage).astype(np.float),
							 (maxValueInImage - minValueInImage).astype(np.float)) * 16)

	# loading digit database
	digits = datasets.load_digits()
	n_samples = len(digits.images)
	data = digits.images.reshape((n_samples, -1))

	# predict
	clf = joblib.load(sys.argv[2]).best_estimator_
	predicted = clf.predict(img.reshape((1, img.shape[0] * img.shape[1])))

	# display results
	print(str(predicted)[1])


if __name__ == "__main__":
	img = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE)
	H, W = img.shape[:2]
	for c in range(H):
		for j in range(W):
			if img[c][j] != 0:
				img[c][j] = 255
	
	img = cv2.dilate(img, np.ones((3, 3), np.uint8), iterations=5)
	ret, img = cv2.threshold(img, 127,255, cv2.THRESH_BINARY)
	contours, hierarchy = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	for cnt in contours:
		x, y, w, h = cv2.boundingRect(cnt);
		
		if w > h:
			y -= (w-h)//2
			h = w
		else:
			x -= (h-w)//2
			w = h
		
		cnt_area = cv2.contourArea(cnt);
		crop = img[y-20:y+h+20, x-20:x+w+20]
		#cv2.imshow("img", crop)
		neural_network(crop)

	#cv2.waitKey(0)
