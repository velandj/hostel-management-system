from django.db import models
from django.contrib.auth.models import User



class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # linked to Django User
    reg_no = models.CharField(max_length=50, unique=True)
    phone = models.CharField(max_length=20)
    year = models.IntegerField()
    course = models.CharField(max_length=100)
    id_proof = models.FileField(upload_to="id_proofs/", null=True, blank=True)

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.reg_no})"


class Complaint(models.Model):
    CATEGORY_CHOICES = [
        ("electricity", "Electricity"),
        ("plumbing", "Plumbing"),
        ("wifi", "Wi-Fi"),
        ("food", "Food"),
        ("other", "Other"),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    description = models.TextField()
    image = models.ImageField(upload_to="complaints/", null=True, blank=True)
    status = models.CharField(max_length=20, default="Pending")  # Pending, In Progress, Resolved
    complaint_date = models.DateTimeField(auto_now_add=True)
    resolved_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Complaint {self.id} by {self.student}"

class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    meal = models.CharField(max_length=20, default="lunch")  # breakfast/lunch/dinner
    rating = models.IntegerField(default=5)  # 1–5
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.meal} ({self.rating})"













































































class Room(models.Model):
    room_no = models.CharField(max_length=20)
    hostel_name = models.CharField(max_length=50)
    capacity = models.IntegerField(default=1)
    occupied = models.IntegerField(default=0)
    room_type = models.CharField(max_length=50, default="General")  # single/double/etc

    def __str__(self):
        return f"{self.hostel_name} - {self.room_no}"

class Allotment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    allotment_date = models.DateField(auto_now_add=True)
    vacate_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.student} -> {self.room}"
