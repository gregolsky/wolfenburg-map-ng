
from google.appengine.ext import db
from google.appengine.api import users


class Place(db.Model):
    
  name = db.StringProperty()
  desc = db.StringProperty(multiline=True)
  coords = db.GeoPtProperty()
  icon = db.StringProperty()
  date_created = db.DateTimeProperty(auto_now_add=True)

def place_to_dto(p):
    return { 'name': p.name, 'coords': [ p.coords.lat, p.coords.lon ], 'icon': p.icon, 'desc': p.desc}
  
class PlacesRepository:
    def __init__(self):
        pass
    
    def save(self, data):
        p = Place()
        p.name, p.desc, p.icon = data.name, data.desc, data.icon
        p.coords = db.GeoPt(data.coords[0], data.coords[1])
        p.put()
        return place_to_dto(p);
    
    def list(self):
        return ( place_to_dto(p) for p in Place.gql("ORDER BY name") )