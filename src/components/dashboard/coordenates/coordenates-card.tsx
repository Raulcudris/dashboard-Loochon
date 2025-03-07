import Link from 'next/link';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import type { ReactNode } from 'react';

interface CoordenatesCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string; 
}

export function CoordenatesCard({ title, description, icon, href = '/' }: CoordenatesCardProps) {
  return (
    <Link href={href} passHref>
      <Card
        sx={{
          cursor: 'pointer',
          '&:hover': {
            boxShadow: 6, 
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