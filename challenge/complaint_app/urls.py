from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet, UserProfileViewSet, ResidentComplaintViewSet

router = routers.SimpleRouter()
router.register(r'current-user', UserProfileViewSet, basename='user')
router.register(r'allComplaints', ComplaintViewSet, basename='complaint')
router.register(r'openCases', OpenCasesViewSet, basename='openCases')
router.register(r'closedCases', ClosedCasesViewSet, basename='closedCases')
router.register(r'topComplaints', TopComplaintTypeViewSet, basename='topComplaints')
router.register(r'constituentComplaints', ResidentComplaintViewSet, basename='constituentComplaints')

urlpatterns = [
    path('current-user', UserProfileViewSet.as_view({'get': 'list'})),
    path('allComplaints', ComplaintViewSet.as_view({'get': 'list'})),
    path('openCases/', OpenCasesViewSet.as_view({'get': 'list'})),
    path('closedCases/', ClosedCasesViewSet.as_view({'get': 'list'})),
    path('topComplaints/', TopComplaintTypeViewSet.as_view({'get': 'list'})),
    path('constituentComplaints/', ResidentComplaintViewSet.as_view({'get': 'list'})),
]
urlpatterns += router.urls