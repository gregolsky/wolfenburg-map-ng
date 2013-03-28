
from google.appengine.ext import db
from google.appengine.api import users

class Map(db.Model):
  name = db.StringProperty()
  desc = db.StringProperty(multiline=True)
  img = db.LinkProperty()
  date_created = db.DateTimeProperty(auto_now_add=True)
  creator = db.EmailProperty()  

class Place(db.Model):
  name = db.StringProperty()
  desc = db.StringProperty(multiline=True)
  coords = db.GeoPtProperty()
  icon = db.StringProperty()
  date_created = db.DateTimeProperty(auto_now_add=True)
  map = db.ReferenceProperty(Map)
  
  def dto(self):
    return { 'id': self.key().id() , 'name': self.name, 'coords': [ self.coords.lat, self.coords.lon ], 'icon': self.icon, 'desc': self.desc }      

def place_to_dto(p):
    return { 'id': p.key().id() , 'name': p.name, 'coords': [ p.coords.lat, p.coords.lon ], 'icon': p.icon, 'desc': p.desc }

def map_to_dto(m):
    return { 'id': m.key().id(), 'name': m.name, 'img': m.img, 'desc': m.desc, 'places': [ place_to_dto(p) for p in m.place_set ] }
  
class PlaceRepository:
    def __init__(self):
        pass
    
    def save(self, data):
        p = Place()
        p.name, p.desc, p.icon = data.name, data.desc, data.icon
        p.coords = db.GeoPt(data.coords[0], data.coords[1])
        p.map = Map.get_by_id(int(data.mapId))
        p.put()
        return place_to_dto(p);
    
    def delete(self, id):
        #key = db.Key.from_path(Place.__name__, id)
        place = Place.get_by_id(id)
        place.delete()
        
class MapRepository:
  def __init__(self):
    pass
  
  def list(self):
    return [ map_to_dto(m) for m in Map.gql("ORDER BY name") ]

  def get(self, id):
    m = Map.get_by_id(id)
    return map_to_dto(m)

  def save(self, data):
    m = Map()
    m.name, m.desc, m.img = data.name, data.desc, data.img
    m.put()
    return map_to_dto(m)          




 
        