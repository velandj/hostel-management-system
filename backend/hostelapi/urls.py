# backend/hostelapi/urls.py
from django.urls import path, include
from rest_framework import routers
from .views import (
    RoomViewSet, ComplaintViewSet, FeedbackViewSet,
    RegisterView, create_room_raw, update_room_occupied_raw, delete_room_raw, apply_room,update_complaint_status,
    get_user_info,AdminComplaintDetailView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r"rooms", RoomViewSet, basename="rooms")
router.register(r"complaints", ComplaintViewSet, basename="complaints")
router.register(r"feedbacks", FeedbackViewSet, basename="feedbacks")


urlpatterns = [
    path("", include(router.urls)),
    path("admin/update_complaint/", update_complaint_status),
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("admin/complaints/<int:pk>/", AdminComplaintDetailView.as_view()),
    # raw sql examples (admin only)
    path("raw/create_room/", create_room_raw),
    path("raw/update_room/", update_room_occupied_raw),
    path("raw/delete_room/", delete_room_raw),
    path("auth/userinfo/", get_user_info),

    path("apply_room/", apply_room),
]
