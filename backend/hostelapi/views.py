
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.db import connection, transaction
from django.contrib.auth.models import User
from .models import Student, Room, Allotment, Complaint, Feedback
from .serializers import (
    RegisterSerializer, UserSerializer,
    StudentSerializer, RoomSerializer, AllotmentSerializer,
    ComplaintSerializer, FeedbackSerializer
)
from rest_framework_simplejwt.views import TokenObtainPairView


from rest_framework.generics import CreateAPIView
class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all().order_by("-complaint_date")
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
      
        student, _ = Student.objects.get_or_create(
    user=self.request.user,
    defaults={
        "reg_no": f"REG{self.request.user.id}",
        "phone": "N/A",
        "year": 1,
        "course": "Unknown"
    }
)

        serializer.save(student=student)


from rest_framework.permissions import AllowAny

from rest_framework.permissions import IsAuthenticated
class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all().order_by("-created_at")
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)





from rest_framework.decorators import api_view
@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_room_raw(request):
    """
    Demonstrates INSERT using raw SQL via Django connection.cursor()
    Expected JSON: { "room_no": "...", "hostel_name": "...", "capacity": 2, "room_type": "Double" }
    """
    data = request.data
    with connection.cursor() as cursor:
        sql = "INSERT INTO hostelapi_room (room_no, hostel_name, capacity, occupied, room_type) VALUES (:1, :2, :3, :4, :5)"
        cursor.execute(sql, [data.get("room_no"), data.get("hostel_name"), data.get("capacity",1), 0, data.get("room_type","General")])
    return Response({"detail":"Room created (raw SQL)."}, status=status.HTTP_201_CREATED)

@api_view(["POST"])
@permission_classes([IsAdminUser])
def update_room_occupied_raw(request):
    """
    JSON: { "room_id": 1, "occupied": 2 }
    """
    room_id = request.data.get("room_id")
    occupied = request.data.get("occupied")
    with connection.cursor() as cursor:
        cursor.execute("UPDATE hostelapi_room SET occupied = :1 WHERE id = :2", [occupied, room_id])
    return Response({"detail":"Room updated (raw SQL)."}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def delete_room_raw(request):
    room_id = request.data.get("room_id")
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM hostelapi_room WHERE id = :1", [room_id])
    return Response({"detail":"Room deleted (raw SQL)."}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def apply_room(request):
    student = Student.objects.get(user=request.user)
    room_id = request.data.get("room_id")
    try:
        room = Room.objects.get(pk=room_id)
    except Room.DoesNotExist:
        return Response({"detail":"Room not found."}, status=404)
    if room.occupied >= room.capacity:
        return Response({"detail":"Room full."}, status=400)
    
    allot = Allotment.objects.create(student=student, room=room)
    room.occupied += 1
    room.save()
    return Response({"detail":"Allotted successfully."}, status=201)



@api_view(["POST"])
@permission_classes([IsAdminUser])
def update_complaint_status(request):
    """
    JSON: { "complaint_id": 1, "status": "Resolved" }
    """
    complaint_id = request.data.get("complaint_id")
    status = request.data.get("status")

    try:
        complaint = Complaint.objects.get(id=complaint_id)
        complaint.status = status
        complaint.save()
        return Response({"detail": "Complaint status updated."}, status=200)
    except Complaint.DoesNotExist:
        return Response({"detail": "Complaint not found."}, status=404)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)



from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .models import Complaint
from .serializers import ComplaintSerializer
from rest_framework.permissions import IsAdminUser

class AdminComplaintDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAdminUser]
