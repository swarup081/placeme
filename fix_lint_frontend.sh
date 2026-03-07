# Fix some basic react unescaped entities and effect issues
sed -i "s/won't/won\&apos;t/g" frontend/components/AuthDrawer.jsx
sed -i "s/I'm/I\&apos;m/g" frontend/components/AuthDrawer.jsx
sed -i "s/Let's/Let\&apos;s/g" frontend/components/AuthDrawer.jsx
sed -i "s/don't/don\&apos;t/g" frontend/components/AuthDrawer.jsx
sed -i "s/doesn't/doesn\&apos;t/g" frontend/components/AuthDrawer.jsx
sed -i "s/can't/can\&apos;t/g" frontend/components/AuthDrawer.jsx
sed -i "s/you're/you\&apos;re/g" frontend/components/AuthDrawer.jsx
sed -i "s/they're/they\&apos;re/g" frontend/components/AuthDrawer.jsx
sed -i "s/we're/we\&apos;re/g" frontend/components/AuthDrawer.jsx

sed -i "s/won't/won\&apos;t/g" frontend/components/StudentDashboard.jsx
sed -i "s/I'm/I\&apos;m/g" frontend/components/StudentDashboard.jsx
sed -i "s/Let's/Let\&apos;s/g" frontend/components/StudentDashboard.jsx
sed -i "s/don't/don\&apos;t/g" frontend/components/StudentDashboard.jsx

sed -i "s/won't/won\&apos;t/g" frontend/components/TnPDashboard.jsx
sed -i "s/I'm/I\&apos;m/g" frontend/components/TnPDashboard.jsx
sed -i "s/Let's/Let\&apos;s/g" frontend/components/TnPDashboard.jsx
sed -i "s/don't/don\&apos;t/g" frontend/components/TnPDashboard.jsx

sed -i "s/won't/won\&apos;t/g" frontend/app/setup-account/page.tsx
sed -i "s/I'm/I\&apos;m/g" frontend/app/setup-account/page.tsx
sed -i "s/Let's/Let\&apos;s/g" frontend/app/setup-account/page.tsx
sed -i "s/don't/don\&apos;t/g" frontend/app/setup-account/page.tsx

# Footer fix
sed -i 's/document.body.style.overflow = "hidden";//g' frontend/components/Footer.tsx
sed -i 's/document.body.style.overflow = "unset";//g' frontend/components/Footer.tsx
