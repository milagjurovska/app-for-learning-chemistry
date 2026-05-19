import React, {useEffect, useState} from "react";
import {Navigate, Link} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.js";

function Profile({user}) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(Boolean(user));

    useEffect(() => {
        let active = true;

        const loadProfile = async () => {
            if (!user) {
                return;
            }

            try {
                const snapshot = await getDoc(doc(db, "users", user.uid));
                if (active && snapshot.exists()) {
                    setProfile(snapshot.data());
                }
            } catch (error) {
                console.error("Error loading profile:", error.message);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadProfile();

        return () => {
            active = false;
        };
    }, [user]);

    if (!user) {
        return <Navigate to="/" replace/>;
    }

    const username = profile?.username || user.displayName || user.email?.split("@")[0] || "student";
    const firstName = profile?.firstName || "";
    const lastName = profile?.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim() || "Chemistry learner";
    const email = profile?.email || user.email || "No email available";

    return (
        <main className="profile-page">
            <section className="profile-hero" aria-label="Profile summary">
                <div className="profile-avatar" aria-hidden="true">
                    {username.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="profile-kicker">Student Profile</p>
                    <h1>@{username}</h1>
                    <p>{fullName}</p>
                </div>
            </section>

            <section className="profile-grid" aria-label="Profile details">
                <article className="profile-panel">
                    <h2>Account</h2>
                    {loading ? (
                        <p>Loading profile...</p>
                    ) : (
                        <dl className="profile-details">
                            <div>
                                <dt>Username</dt>
                                <dd>@{username}</dd>
                            </div>
                            <div>
                                <dt>Name</dt>
                                <dd>{fullName}</dd>
                            </div>
                            <div>
                                <dt>Email</dt>
                                <dd>{email}</dd>
                            </div>
                        </dl>
                    )}
                </article>

                <article className="profile-panel">
                    <h2>Learning Progress</h2>
                    <ul className="profile-progress">
                        <li>Introduction quiz available</li>
                        <li>Memory game available</li>
                        <li>Chemical reactions lab available</li>
                    </ul>
                    <Link className="profile-cta" to="/chapter2">Open Lab</Link>
                </article>
            </section>
        </main>
    );
}

export default Profile;
