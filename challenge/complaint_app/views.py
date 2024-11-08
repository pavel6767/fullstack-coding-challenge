from django.db.models import Count
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer

# Create your views here.
class BaseComplaintViewSet(viewsets.ModelViewSet): 
  permission_classes = [IsAuthenticated] 
  http_method_names = ['get'] 
  
  def get_user_profile_data(self,request): 
    user_profile = UserProfile.objects.get(user=request.user) 
    user_data = UserProfileSerializer(user_profile).data 
    target_account = "NYCC" + user_data['district'].zfill(2) 
    return user_data, target_account

class ComplaintViewSet(BaseComplaintViewSet):
  def list(self, request):
    # Get all complaints from the user's district
    _, target_account = self.get_user_profile_data(request)
    district_complaints = Complaint.objects.filter(account=target_account)
    complaints_data = ComplaintSerializer(district_complaints, many=True).data
    return Response(complaints_data)

class OpenCasesViewSet(BaseComplaintViewSet):
  def list(self, request):
    # Get only the open complaints from the user's district
    _, target_account = self.get_user_profile_data(request)
    open_complaints = Complaint.objects.filter(account=target_account, opendate__isnull=False, closedate__isnull=True)
    complaints_data = ComplaintSerializer(open_complaints, many=True).data
    return Response(complaints_data)

class ClosedCasesViewSet(BaseComplaintViewSet):
  def list(self, request):
    # Get only complaints that are close from the user's district
    _, target_account = self.get_user_profile_data(request)
    closed_complaints = Complaint.objects.filter(account=target_account, closedate__isnull=False)
    complaints_data = ComplaintSerializer(closed_complaints, many=True).data
    return Response(complaints_data)
    
class TopComplaintTypeViewSet(BaseComplaintViewSet):
  def list(self, request):
    # Get the top 3 complaint types from the user's district
    _, target_account = self.get_user_profile_data(request)
    district_complaints = Complaint.objects.filter(account=target_account)
    complaint_type_counts = district_complaints.values('complaint_type').annotate(count=Count('complaint_type')).order_by('-count')[:3]

    top_complaint_types = list(complaint_type_counts) 
    return Response(top_complaint_types)
  
class UserProfileViewSet(BaseComplaintViewSet):
  def list(self, request):
    user_data,_ = self.get_user_profile_data(request)
    return Response(user_data)