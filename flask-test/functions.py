import pytz
import datetime

def date_format(dateobj, format = None, tz = 'America/New_York'):
	if format != None:
		return pytz.utc.localize(dateobj).astimezone(pytz.timezone(tz)).strftime(format)
	else:
		return pytz.utc.localize(dateobj).astimezone(pytz.timezone(tz))
