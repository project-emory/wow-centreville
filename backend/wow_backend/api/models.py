from datetime import timezone

from django.db import models



class User(models.Model):
    phone_number = models.CharField(max_length=20, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class MenuItem(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    menu_items = models.ManyToManyField(MenuItem, through='OrderItem')
    payment_status = models.CharField(max_length=20, default='unpaid')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_amount(self):
        return sum(item.price for item in self.menu_items.all())

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('order', 'menu_item')




