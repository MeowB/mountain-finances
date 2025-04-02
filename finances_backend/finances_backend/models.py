from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model



class CustomUser(AbstractUser):
    pass  # Add extra fields if needed


class Transaction(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)  # Associate with user
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100)  # e.g., 'Food', 'Entertainment'
    description = models.TextField(blank=True, null=True)  # Optional description

    def __str__(self):
        return f"{self.amount} - {self.category} on {self.date}"

class Income(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_received = models.DateTimeField()
    type = models.CharField(max_length=50, choices=[('recurrent', 'Recurrent'), ('non_recurrent', 'Non-recurrent')])
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.amount} - {self.type} income on {self.date_received}"

class Budget(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    category = models.CharField(max_length=100)  # e.g., 'Food', 'Entertainment'
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return f"Budget for {self.category}: {self.limit} from {self.start_date} to {self.end_date}"

class SavingsPot(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=100)  # e.g., 'Vacation Fund', 'Emergency Fund'
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    current_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    target_date = models.DateTimeField()

    def __str__(self):
        return f"Savings Pot: {self.name} (Target: {self.target_amount})"

class RecurringBill(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=100)  # e.g., 'Rent', 'Netflix Subscription'
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateTimeField()
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"Bill: {self.name} (Amount: {self.amount}, Due: {self.due_date})"
