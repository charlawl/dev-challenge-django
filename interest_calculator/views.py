from django.http import HttpResponseBadRequest, JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json

@require_POST
@csrf_exempt
def interest_data(request):
    data = json.loads(request.body)
    
    initial_amount = data["initial_amount"]
    monthly_amount = data["monthly_amount"]
    interest_rate_yearly = data["interest_rate"]
    
    if interest_rate_yearly == 0:
        return HttpResponseBadRequest("Interest cannot be zero")

    interest_rate = (interest_rate_yearly/100)/12
    result = [interest(initial_amount, monthly_amount, interest_rate, time) for time in range(600)]
    return JsonResponse({"results":result})

def interest(p, m, r, t):
    return m * (((1 + r)**t) - 1)/r + p * ((1 + r)**t)