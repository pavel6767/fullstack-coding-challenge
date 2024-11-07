from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class ComplaintViewSet(viewsets.ModelViewSet):
  permission_classes = [IsAuthenticated]
  http_method_names = ['get']
  serializer_class = ComplaintSerializer

  def list(self, request):
    # Get all complaints from the user's district
    allComplaints = Complaint.objects.all()
    data = self.serializer_class(allComplaints, many=True) 
    return Response(data.data)

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get only the open complaints from the user's district
    return Response()

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  def list(self, request):
    # Get only complaints that are close from the user's district
    return Response()
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get the top 3 complaint types from the user's district
    return Response()