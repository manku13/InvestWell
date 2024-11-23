from django.db import models

class Investment(models.Model):
    FUND_TYPE_CHOICES = [
        ('EQUITY', 'Equity'),
        ('DEBT', 'Debt'),
        ('MUTUAL_FUND', 'Mutual Fund'),
        ('BONDS', 'Bonds'),
    ]

    user_name = models.CharField(max_length=255)
    pan_number = models.CharField(max_length=10)
    fund_name = models.CharField(max_length=255)
    investment_type = models.CharField(max_length=50, choices=FUND_TYPE_CHOICES)
    invested_amount = models.DecimalField(max_digits=10, decimal_places=2)
    current_value = models.DecimalField(max_digits=10, decimal_places=2)
    invested_date = models.DateField()
    note = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user_name} - {self.fund_name}"
