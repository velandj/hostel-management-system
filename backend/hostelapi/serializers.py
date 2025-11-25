
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Student, Room, Allotment, Complaint, Feedback

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","username","first_name","last_name","email")

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ("username","first_name","last_name","email","password")
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email",""),
            password=validated_data["password"],
            first_name=validated_data.get("first_name",""),
            last_name=validated_data.get("last_name",""),
        )
        Student.objects.create(
        user=user,
        reg_no=f"REG{user.id}", 
        phone="N/A",
        year=1,
        course="Unknown"
        )
        return user

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Student
        fields = "__all__"

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

class AllotmentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    room = RoomSerializer(read_only=True)
    class Meta:
        model = Allotment
        fields = "__all__"

class ComplaintSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    class Meta:
        model = Complaint
        fields = "__all__"

from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "is_staff", "is_superuser")
