#   settings.py
from django.conf import settings

#   mongo server configuration
SERVER_HOSTNAME = getattr(settings, 'SERVER_HOSTNAME', 'localhost')
SERVER_PORT = getattr(settings, 'SERVER_PORT', '3306')
SERVER_USER = getattr(settings, 'SERVER_USER', 'root')
SERVER_PASSWORD = getattr(settings, 'SERVER_PASSWORD', 'root')
SERVER_DB = getattr(settings, 'SERVER_DB', 'citysensing')

#	api rest base url
BASE_URL = "http://156.54.107.76:8003"