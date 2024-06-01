def mark_view(mark_name):
    def decorator(func):
        func.mark_name = mark_name
        return func
    return decorator