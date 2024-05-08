from rest_framework.serializers import ModelSerializer

BASE_FORMATS = {
    'date': '%d.%m.%Y',
    'datetime': '%d.%m.%Y %H:%M',
    'time': '%H:%M',
}

class BaseAdminFieldsSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
      
    def detect_field_type(self, field) -> str | None:
        types_map = {
            'BigAutoField': 'number',
            'AutoField': 'number',
            'CharField': 'text' if not field.choices else 'select',
            'EmailField': 'email',
            'DateField': 'date',
            'DateTimeField': 'datetime',
            'BooleanField': 'checkbox',
            'TextField': 'textarea',
            'IntegerField': 'number',
            'FloatField': 'number',
            'DecimalField': 'number',
            'PasswordField': 'password',
        }
        if field.get_internal_type() in types_map:
            return types_map[field.get_internal_type()]
        else:
            return None
    
    def get_field_types(self, obj) -> dict:
        new_fields = {}
        for field in self.Meta.model._meta.fields:
            field_type = self.detect_field_type(field)
            if field_type:
                value = getattr(obj, field.name)
                new_fields[field.name] = {
                    'value': value if value is not None else '',
                    'type': field_type,
                    'readOnly': self.fields[field.name].read_only,
                    'options': [choice[0] for choice in field.choices] if field.choices else None,
                }
        return new_fields
    

class BaseAdminSerializer(BaseAdminFieldsSerializer):
    class Meta:
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for field in self.Meta.model._meta.fields:
            attr = getattr(instance, field.name)
            if attr is not None:
                if field.get_internal_type() == 'ForeignKey':
                    representation[field.name] = attr.id
                elif field.get_internal_type() == 'DateTimeField':
                    representation[field.name] = attr.strftime(BASE_FORMATS['datetime'])
                elif field.get_internal_type() == 'DateField':
                    representation[field.name] = attr.strftime(BASE_FORMATS['date'])
                elif field.get_internal_type() == 'TimeField':
                    representation[field.name] = attr.strftime(BASE_FORMATS['time'])
        return representation