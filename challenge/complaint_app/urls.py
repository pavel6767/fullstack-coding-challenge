from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet, UserProfileViewSet

router = routers.SimpleRouter()
router.register(r'current-user', UserProfileViewSet, basename='user')
router.register(r'allComplaints', ComplaintViewSet, basename='complaint')
router.register(r'openCases', OpenCasesViewSet, basename='openCases')
router.register(r'closedCases', ClosedCasesViewSet, basename='closedCases')
router.register(r'topComplaints', TopComplaintTypeViewSet, basename='topComplaints')

urlpatterns = [
    path('', ComplaintViewSet.as_view({'get': 'list'})),
    path('open', OpenCasesViewSet.as_view({'get': 'list'})),
    path('closed', ClosedCasesViewSet.as_view({'get': 'list'})),
    path('top', TopComplaintTypeViewSet.as_view({'get': 'list'})),
    path('current-user', UserProfileViewSet.as_view({'get': 'list'})),
]
urlpatterns += router.urls