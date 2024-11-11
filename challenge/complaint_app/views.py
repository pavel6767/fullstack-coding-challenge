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
    user_district = "NYCC" + user_data['district'].zfill(2)
    return user_data, user_district

  def filter_complaints(self, **query):
    current_complaints = Complaint.objects.filter(**query)
    complaints_data = ComplaintSerializer(current_complaints, many=True).data
    return complaints_data

class ComplaintViewSet(BaseComplaintViewSet):
  def list(self, request):
    # Get all complaints from the user's district
    _, user_district = self.get_user_profile_data(request)
    complaints_data = self.filter_complaints(account=user_district)
    return Response(complaints_data)

class OpenCasesViewSet(BaseComplaintViewSet):
  def list(self, request):
    # Get only the open complaints from the user's district
    _, user_district = self.get_user_profile_data(request)
    complaints_data = self.filter_complaints(account=user_district, opendate__isnull=False, closedate__isnull=True)
    return Response(complaints_data)

class ClosedCasesViewSet(BaseComplaintViewSet):
  def list(self, request):
    # Get only complaints that are close from the user's district
    _, user_district = self.get_user_profile_data(request)
    complaints_data = self.filter_complaints(account=user_district, closedate__isnull=False)
    return Response(complaints_data)
    
class TopComplaintTypeViewSet(BaseComplaintViewSet):
  def list(self, request):
    # Get the top 3 complaint types from the user's district
    _, user_district = self.get_user_profile_data(request)
    district_complaints = Complaint.objects.filter(account=user_district)
    complaint_type_counts = district_complaints.values('complaint_type').annotate(count=Count('complaint_type')).order_by('-count')[:3]

    top_complaint_types = list(complaint_type_counts) 
    return Response(top_complaint_types)

class UserProfileViewSet(BaseComplaintViewSet):
  def list(self, request):
    # get user data
    user_data, _ = self.get_user_profile_data(request)
    return Response(user_data)

class ResidentComplaintViewSet(BaseComplaintViewSet):
  def list(self, request):
    # get complaints made by residents that share same district as user
    _, user_district = self.get_user_profile_data(request)
    complaints_data = self.filter_complaints(council_dist=user_district)
    return Response(complaints_data)

# :P: alternate
# class ResidentComplaintViewSet(BaseComplaintViewSet):
#   def list(self, request):
#     # get complaints made by residents that share same district as user
#     _, user_district = self.get_user_profile_data(request)
#     all_complaints = Complaint.objects.filter(council_dist=user_district)
#     open_cases_data = self.filter_complaints(council_dist=user_district, opendate__isnull=False, closedate__isnull=True)
#     closed_cases_data = self.filter_complaints(council_dist=user_district, closedate__isnull=False)

#     complaint_type_counts = all_complaints.values('complaint_type').annotate(count=Count('complaint_type')).order_by('-count')[:3]
#     top_complaint_types = list(complaint_type_counts)

#     all_complaints_data = ComplaintSerializer(all_complaints, many=True).data

#     return Response({
#       'all_complaints': all_complaints_data,
#       'open_cases': open_cases_data,
#       'closed_cases': closed_cases_data,
#       'top_complaint_types': top_complaint_types
#     })