from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Investment
from .serializers import InvestmentSerializer

from django.http import HttpResponse

def default_page(request):
    html_content = """
    <html>
    <head>
        <title>SensibleT Assessment</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { padding: 50px; text-align: center; }
            h1 { font-size: 2.5em; font-weight: bold; color: #333; }
            p { font-size: 1.2em; color: #555; }
            .instruction { font-size: 1.2em; font-weight: bold; color: #007BFF; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to SensibleT Assessment</h1>
            <p><strong>Hey there!</strong> You have successfully reached the default page of the project.</p>
            <p class="instruction">For more information on how to use the project, please head over to the README file.</p>
        </div>
    </body>
    </html>
    """
    return HttpResponse(html_content)

# GET request to fetch investments based on PAN number
@api_view(['GET'])
def get_investments(request):
    pan_number = request.query_params.get('pan_number', None)
    
    if not pan_number:
        return Response({"error": "PAN number is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Fetch the investments associated with the provided PAN number
    investments = Investment.objects.filter(pan_number=pan_number)
    
    if not investments.exists():
        return Response({"error": "PAN verification failed, no investments found for this PAN."}, 
                        status=status.HTTP_404_NOT_FOUND)

    # Serialize the investments data
    serializer = InvestmentSerializer(investments, many=True)
    return Response(serializer.data)


# POST request to add new investment data
@api_view(['POST'])
def add_investment(request):
    # Validate the incoming data using the serializer
    serializer = InvestmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # Save the data to the database
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # Return validation errors if the data is invalid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
