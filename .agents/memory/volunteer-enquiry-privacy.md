---
name: Volunteer enquiry privacy
description: User's chosen delivery destination and administrator authorization decision.
---

Volunteer enquiries should go to a private website inbox, not WhatsApp or a call-only contact card.

**Why:** The user chose “Private website inbox” when asked where the volunteer form should send enquiries.

**How to apply:** Keep submitted contact details private. Do not treat a newly registered account, or the first account to register, as an administrator.

Administrator authorization uses the explicitly configured verified email rather than a development-only auth user ID.

**Why:** Development and production authentication have separate user stores. A verified-email restriction can identify the authorized administrator in both without granting access to arbitrary registrants.

**How to apply:** Fail closed until administrator access is configured. Any future multi-administrator access must be explicitly granted, not derived from signup order.

The WhatsApp community invite belongs beneath the volunteer form, rather than in a separate section.

**Why:** The user selected “Beneath the volunteer form” after requesting mobile / WhatsApp contact collection.

**How to apply:** Keep community membership as a separate, optional invite action. Volunteer contact details still go to the private website inbox; collecting a number is not community-joining consent.
