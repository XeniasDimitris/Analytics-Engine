from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from ..controllers.ParkingController import get_parkings_info, get_parkings_records

data_dir = settings.DATA_DIR+'Parkings/'


class ParkingInfoView(APIView):

    def get(self, request, format=None):
        # Get Parking Areas information

        res = get_parkings_info(data_dir)
        return Response(res, status=status.HTTP_200_OK)


class ParkingRecordsView(APIView):

    def get(self, request, format=None):
        # Get Records for every Parking Areas in a date window

        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        parking = request.query_params['parking'] if 'parking' in request.query_params else None
        groupby = request.query_params['groupBy'] if 'groupBy' in request.query_params else None
        res = get_parkings_records(data_dir, start, end, parking, groupby)
        return Response(res, status=status.HTTP_200_OK)

