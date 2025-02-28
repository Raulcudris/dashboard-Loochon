// components/dashboard/user/UserCard.tsx
import Link from 'next/link';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import type { ReactNode } from 'react';

interface UserCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string; // href es opcional y por defecto será "/"
}

export function UserCard({ title, description, icon, href = '/' }: UserCardProps) {
  return (
    <Link href={href} passHref>
      <Card
        sx={{
          cursor: 'pointer',
          '&:hover': {
            boxShadow: 6, // Efecto de sombra al pasar el mouse
          },
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            {icon}
            <Stack>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}