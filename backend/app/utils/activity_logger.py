from app.models import ActivityLog


def create_activity_log(
    db,
    user_id,
    action,
    details=None
):
    activity = ActivityLog(
        user_id=user_id,
        action=action,
        details=details
    )

    db.add(activity)
    db.commit()