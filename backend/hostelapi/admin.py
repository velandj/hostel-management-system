# backend/hostelapi/admin.py
from django.contrib import admin
from .models import Student, Room, Allotment, Complaint, Feedback

admin.site.register(Student)
admin.site.register(Room)
admin.site.register(Allotment)
admin.site.register(Complaint)
admin.site.register(Feedback)
