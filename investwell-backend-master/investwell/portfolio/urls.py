from django.urls import path
from . import views

urlpatterns = [
    path('', views.default_page, name='default_page'),
    path('investments/', views.get_investments, name='get_investments'),
    path('investments/add/', views.add_investment, name='add_investment'),
]
